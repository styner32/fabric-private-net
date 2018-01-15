#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

DOCKER_COMMAND="sudo docker"
DOCKER_COMPOSE_COMMAND="sudo docker-compose"

function dkcl(){
        CONTAINER_IDS=$($DOCKER_COMMAND ps -aq)
	echo
        if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" = " " ]; then
                echo "========== No containers available for deletion =========="
        else
                $DOCKER_COMMAND rm -f $CONTAINER_IDS
        fi
	echo
}

function dkrm(){
        DOCKER_IMAGE_IDS=$($DOCKER_COMMAND images | grep "dev\|none\|test-vp\|peer[0-9]-" | awk '{print $3}')
	echo
        if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" = " " ]; then
		echo "========== No images available for deletion ==========="
        else
                $DOCKER_COMMAND rmi -f $DOCKER_IMAGE_IDS
        fi
	echo
}

function restartNetwork() {
	echo

        #teardown the network and clean the containers and intermediate images
	cd artifacts
	$DOCKER_COMPOSE_COMMAND down
	dkcl
	dkrm

	#Cleanup the material
	rm -rf /tmp/hfc-test-kvs_peerOrg* $HOME/.hfc-key-store/ /tmp/fabric-client-kvs_peerOrg*

	#Start the network
	$DOCKER_COMPOSE_COMMAND up -d
	cd -
	echo
}

restartNetwork
