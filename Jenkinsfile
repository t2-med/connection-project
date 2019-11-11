node() {
// Step 1
stage('stage-1') {
parallel(
'step-1.1': {
        echo "Job 1 of step 1"
      },
'step-1.2': {
        echo "Job 2 of step 1"
      },
    )
  }
// Step 2
stage('stage-2') {
    echo "Job 1 of step 2"
  }
// Étape 3
stage('stage-3') {
parallel(
'step-3.1': {
// should take less than 10 seconds
timeout(time: 10, unit: 'SECONDS') {
          echo "Job 1 of step 3"
        }
      },
'step-3.2': {
        echo "Job 2 of step 3"
      },
'step-3.3': {
        echo "Job 3 of step 3"
      },
    )
  }
}