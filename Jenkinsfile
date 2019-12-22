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
        stage('BUILD') {
            sh 'npm install'
        }
        stage('Test') {
            echo 'npm test'
        }
    }
    stage('Docker Build') {
        // newImage = docker.build("med2bouanane/node_connection:1.0.${env.BUILD_ID}")
        sh 'docker login -u=$DOCKER_HUB_USER -p=$DOCKER_HUB_PASS docker.io'
        sh 'docker-compose build'
        sh 'docker-compose up -d'
    }
    stage('Docker Tag') {
        sh 'docker tag $DOCKER_HUB_USER/node_connection $DOCKER_HUB_USER/node_connection:1.0.${env.BUILD_ID}'
        // sh 'docker tag $DOCKER_HUB_USER/node_connection $DOCKER_HUB_USER/node_connection:latest'
    }
    stage('Docker Push') {
        // docker.withRegistry('', 'DockerHub') {
        // newImage.push()
        // }
        sh 'docker-compose bundle --push-images'
    }
}
