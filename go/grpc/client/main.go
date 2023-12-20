package main

import (
	"context"
	"flag"
	"log"
	"time"

	"github.com/belekanych/sandbox/grpc/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	serverAddr := flag.String(
		"server", "localhost:3000",
		"The server address in the format of host:[port]",
	)
	flag.Parse()


	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	conn, err := grpc.DialContext(ctx, *serverAddr, opts...)
	if err != nil {
		log.Fatalln("fail to dial:", err)
	}
	defer conn.Close()

	client := pb.NewCalculatorClient(conn)

	res, err := client.Sum(ctx, &pb.NumbersRequest{
		Numbers: []int64{10, 10, 10, 10, 15},
	})
	if err != nil {
		log.Fatalln("error sending request:", err)
	}
	log.Println(res)
}