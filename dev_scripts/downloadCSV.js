// download nearby birds as CSV for testing

// Assuming you have a list of bird objects...



// Create CSV content
let csvContent = "formattedComName, comName, sciName, learnMoreLink, habitat\n";
sortedRegionalBirds.forEach(bird => {
    csvContent += bird.formattedComName + "," + bird.comName + "," + bird.sciName + "," + bird.learnMoreLink + "," + bird.habitat + "\n";
});

// Create a Blob from the CSV content
const blob = new Blob([csvContent], { type: 'text/csv' });
const url = URL.createObjectURL(blob);

// Create a link element and trigger a download
const link = document.createElement('a');
link.setAttribute('href', url);
link.setAttribute('download', 'nearby_birds.csv');
document.body.appendChild(link);
link.click();
document.body.removeChild(link);