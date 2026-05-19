FROM node:20-alpine AS builder

WORKDIR /build
COPY web/default/package.json .
ARG NPM_REGISTRY=https://registry.npmmirror.com
RUN npm config set registry ${NPM_REGISTRY} \
    && npm install --force
COPY ./web/default .
COPY ./VERSION .
RUN DISABLE_ESLINT_PLUGIN='true' VITE_REACT_APP_VERSION=$(cat VERSION) npm run build

FROM golang:1.26.1-alpine AS builder2
ENV GO111MODULE=on CGO_ENABLED=0
ARG GOPROXY=https://goproxy.cn
ENV GOPROXY=${GOPROXY}

ARG TARGETOS
ARG TARGETARCH
ENV GOOS=${TARGETOS:-linux} GOARCH=${TARGETARCH:-amd64}
ENV GOEXPERIMENT=greenteagc

WORKDIR /build

ADD go.mod go.sum ./
ENV GONOSUMCHECK=* GONOSUMDB=* GOFLAGS=-mod=mod
RUN go get go.uber.org/zap@v1.27.1 gopkg.in/natefinch/lumberjack.v2@v2.2.1 && go mod tidy
RUN go mod download

COPY . .

COPY --from=builder /build/dist ./web/default/dist

RUN mkdir -p ./web/default/dist/logos
COPY web/default/public/logos ./web/default/dist/logos

RUN mkdir -p ./web/classic/dist/assets \
    && printf '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>New-API</title></head><body></body></html>' > ./web/classic/dist/index.html

RUN go build -ldflags "-s -w -X 'github.com/QuantumNous/new-api/common.Version=$(cat VERSION)'" -o new-api

FROM debian:bookworm-slim

RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates tzdata libasan8 wget \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates

COPY --from=builder2 /build/new-api /
EXPOSE 3000
WORKDIR /data
ENTRYPOINT ["/new-api"]
