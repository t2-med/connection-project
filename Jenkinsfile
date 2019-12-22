// node('docker') {
 
//     stage 'Checkout'
//         checkout scm
//     stage 'Build & UnitTest'
//         sh "docker build -t med2bouanane/node_connection:B${BUILD_NUMBER} -f Dockerfile ."
//         sh "docker build -t accountownerapp:test-B${BUILD_NUMBER} -f Dockerfile.Integration ."
  
//     stage 'Integration Test'
//         sh "docker-compose -f docker-compose.integration.yml up --force-recreate --abort-on-container-exit"
//         sh "docker-compose -f docker-compose.integration.yml down -v"
// }

node {
    stage('Clone repository') {
        checkout scm
    }
    // stage('Docker Build') {
    //     sh 'docker build -t med2bouanane/node_connection:1.0.0 .'
    // }
    /* Requires the Docker Pipeline plugin to be installed */
    docker.image('node:latest').inside {
        def newImage
        stage('Node: BUILD') {
            sh 'npm install'
        }
        stage('Node: Test') {
            echo 'npm test'
        }
    }
    stage('Docker Login') {
        // newImage = docker.build("med2bouanane/node_connection:1.0.${env.BUILD_ID}")
        sh 'docker login -u=$DOCKER_HUB_USER -p=$DOCKER_HUB_PASS docker.io'
    }
    stage('Docker Build latest version') {
        sh 'docker-compose -f docker-compose.yml  build'
        sh "docker-compose -f docker-compose.yml  up -d"
    }
    // stage('Docker Tag') {
    //     sh "docker tag $DOCKER_HUB_USER/node_connection $DOCKER_HUB_USER/node_connection:1.0.${env.BUILD_ID}-SNAPSHOT"
    //     sh "docker tag $DOCKER_HUB_USER/node_connection $DOCKER_HUB_USER/node_connection:latest"
    // }
    stage('Docker Push latest version') {
        sh 'docker-compose -f docker-compose.yml push'
        // docker.withRegistry('', 'DockerHub') {
        // newImage.push()
        // }

        // sh 'docker-compose bundle --push-images'
    }
    stage('Docker Build new version') {
        sh "export MINOR_TAG=${env.BUILD_ID}"
        sh 'docker-compose -f docker-compose.override.yml build'
        sh "MINOR_TAG=${env.BUILD_ID} docker-compose -f docker-compose.override.yml up -d"
    }
    stage('Docker Push new version') {
        sh 'docker-compose -f docker-compose.override.yml push'
    }
    stage('Docker Logout') {
        sh 'docker logout'
    }
}
