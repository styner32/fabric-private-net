package main

import (
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

var logger = shim.NewLogger("nda_handler")

// NDAHandler example simple Chaincode implementation
type NDAHandler struct {
}

func (t *NDAHandler) Init(stub shim.ChaincodeStubInterface) pb.Response {
	logger.Info("########### NDAHandler Init ###########")

	return shim.Success(nil)
}

// Transaction makes payment of X units from A to B
func (t *NDAHandler) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	logger.Info("########### NDAHandler Invoke ###########")

	function, args := stub.GetFunctionAndParameters()

	if function == "create" {
		// Create doc
		return t.create(stub, args)
	}

	if function == "getdoc" {
		// Read doc
		return t.getdoc(stub, args)
	}

	errMsg := fmt.Sprintf("Unknown action, check the first argument, must be one of 'create' or 'getdoc'. But got: %v", args[0])
	logger.Error(errMsg)
	return shim.Error(errMsg)
}

func (t *NDAHandler) create(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	title := args[0]
	doc := args[1]

	if err := stub.PutState(title, []byte(doc)); err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

func (t *NDAHandler) getdoc(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	title := args[0]
	result, err := stub.GetState(title)

	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(result)
}

func main() {
	err := shim.Start(new(NDAHandler))
	if err != nil {
		logger.Errorf("Error starting chaincode: %s", err)
	}
}
