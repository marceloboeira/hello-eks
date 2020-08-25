IMAGE_NAME=marceloboeira/hello-eks
IMAGE_VERSION=1.0
IMAGE_CREATE_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"`
IMAGE_SOURCE_REVISION=`git rev-parse HEAD`
IMAGE_ROOT_PATH=app/

.PHONY: build
build:
	@docker build --no-cache --build-arg IMAGE_VERSION="$(IMAGE_VERSION)" --build-arg IMAGE_CREATE_DATE="$(IMAGE_CREATE_DATE)" --build-arg IMAGE_SOURCE_REVISION="$(IMAGE_SOURCE_REVISION)" -f Dockerfile -t "$(IMAGE_NAME):$(IMAGE_VERSION)" app

.PHONY: push
push:
	@docker push $(IMAGE_NAME):$(IMAGE_VERSION)
