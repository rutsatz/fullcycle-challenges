# docker run --rm -it -v $(pwd)/:/go/src/app golang:1.17 bash
# docker build -t rutsatz/golang-app .

FROM golang:alpine3.14 as builder

WORKDIR /go/src/app
COPY . .
RUN go build

# Stage 2
FROM scratch

WORKDIR /go/src/app

COPY --from=builder /go/src/app .

CMD ["./app"]
