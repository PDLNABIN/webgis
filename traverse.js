
function generateFields() {
    const numStations = parseInt(document.getElementById('num-stations').value);
    const dynamicInputs = document.getElementById('dynamic-inputs');
    
    
    dynamicInputs.innerHTML = '';

   
    for (let i = 1; i <= numStations; i++) {

        const pointInputContainer = document.createElement('div');
        pointInputContainer.setAttribute('class', 'point-input-container'); 
        
        
        const distanceLabel = document.createElement('label');
        distanceLabel.textContent = `Distance to Station ${i}: `;
        const distanceInput = document.createElement('input');
        distanceInput.type = 'number';
        distanceInput.id = `distance-${i}`;
        distanceInput.required = true;

        const angleLabel = document.createElement('label');
        angleLabel.textContent = `Internal Angle at Station ${i}: `;
        const angleInput = document.createElement('input');
        angleInput.type = 'number';
        angleInput.id = `angle-${i}`;
        angleInput.required = true;

        
        pointInputContainer.appendChild(distanceLabel);
        pointInputContainer.appendChild(distanceInput);
        pointInputContainer.appendChild(angleLabel);
        pointInputContainer.appendChild(angleInput);

        
        dynamicInputs.appendChild(pointInputContainer);
    }
}



function calculateCoordinates() {
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const bear = parseFloat(document.getElementById('bear').value) || 0; 
    
    const numStations = parseInt(document.getElementById('num-stations').value);
    let distances = [];
    let angles = [];

    
    for (let i = 1; i < numStations; i++) {
        distances.push(parseFloat(document.getElementById(`distance-${i}`).value));
        angles.push(parseFloat(document.getElementById(`angle-${i}`).value));
    }

    let results = `Results:\n`;
    

    results += `Point 1: X = ${x1.toFixed(2)}, Y = ${y1.toFixed(2)}\n`;

    let xPrev = x1;
    let yPrev = y1;
    let fb = bear; 

    for (let i = 0; i < distances.length; i++) {
        const distance = distances[i];
        const angle = angles[i];

       
        let bb;
        if (fb > 180) {
            bb = fb - 180; 
        } else {
            bb = fb + 180; 
        }

        
        fb = (bb - angle) 

        
        const bearingRadians = fb * (Math.PI / 180);

        
        const xNew = xPrev + distance * Math.cos(bearingRadians);
        const yNew = yPrev + distance * Math.sin(bearingRadians);

        
        results += `Point ${i + 2}: X = ${xNew.toFixed(2)}, Y = ${yNew.toFixed(2)}\n`;

        
        xPrev = xNew;
        yPrev = yNew;
    }

    
    document.getElementById('result').innerText = results;
}
