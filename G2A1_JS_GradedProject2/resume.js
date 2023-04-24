function onLoad() {
    fetch('./data.json')
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            window.resumeList = data.resume
            window.resumeBackup = window.resumeList
            window.current = 0
            feedDataToTemplate()
        });

}


function loadNextCandidate() {
    window.current += 1;
    feedDataToTemplate();
}

function loadPreviousCandidate() {
    window.current -= 1;
    feedDataToTemplate();
}

function feedDataToTemplate() {

    // console.log(jsonData)
    const candidate = window.resumeList[window.current];
    // console.log(candidate)
    let { basics, skills, work, Internship: internship, projects, education, achievements, interests } = candidate;

    {
        let introEl = document.querySelector('.main > .intro  > div');
        var setHTML = `
        <div class="candidate-name">
			<span id="candidateName">${basics.name}</span>
	    </div>
		<div class="positionAppFor">
			<span>Applied For : </span>
		    <span id="position">${basics.AppliedFor}</span>
        </div>
    `;
        introEl.innerHTML = setHTML;
    }

    {
        let workExpEl = document.querySelector('#workExp');
        var setHTML = `
        <label for="companyName">Company Name: </label>
        <span id="companyName">${work["Company Name"]}</span>
        <br />
        <label for="prevPosition">Position: </label>
        <span id="prevPosition">${work["Position"]}</span>
        <br />
        <label for="stratDate">Strat Date: </label>
        <span id="stratDate">${work["Start Date"]}</span>
        <br />
        <label for="endDate">End Date: </label>
        <span id="endDate">${work["End Date"]}</span>
        <br />
        <label for="summary">Summary: </label>
        <span id="summary">${work["Summary"]}</span>
    `;
        workExpEl.innerHTML = setHTML;
    }

    {
        let projectsEl = document.querySelector('#projects');
        var setHTML = `
        <span id="projectLabel">
            ${projects.name}:
        </span>
        <span id="projectSummary">${projects.description}</span>
    `;
        projectsEl.innerHTML = setHTML;
    }

    {
        let educationEl = document.querySelector('#education');
        var setHTML = `
        <ul>
            <li>
                <label for="ug">UG: </label>
                <span id="ug">${education["UG"]["institute"]}, ${education["UG"]["course"]}, ${education["UG"]["Start Date"]}, ${education["UG"]["End Date"]}, ${education["UG"]["cgpa"]}</span>
            </li>
            <li>
                <label for="seniorSecondary"
                    >Senior Secondary :
                </label>
                <span id="seniorSecondary">${education["Senior Secondary"]["institute"]}, ${education["Senior Secondary"]["cgpa"]}</span>
            </li>
            <li>
                <label for="highSchool"
                    >High School:
                </label>
                <span id="highSchool">${education["High School"]["institute"]}, ${education["High School"]["cgpa"]}</span>
            </li>
        </ul>
    `;
        educationEl.innerHTML = setHTML;
    }

    {
        let internshipEl = document.querySelector('#internship');
        var setHTML = `
        <ul>
            <li>
                <label for="companyName">
                Company Name:
                </label>
                <span id="companyName">${internship["Company Name"]}</span>
            </li>
            <li>
                <label for="prevPosition">
                Position:
                </label>
                <span id="prevPosition">
                ${internship["Position"]}
                </span>
            </li>
            <li>
                <label for="startDate">
                Strat Date:
                </label>
                <span id="startDate">${internship["Start Date"]}</span>
            </li>
                <li>
                <label for="endDate">
                End Date:
                </label>
                <span id="endDate">${internship["End Date"]}</span>
            </li>
            <li>
                <label for="summary">
                Summary:
                </label>
                <span id="summary">${internship["Summary"]}</span>
            </li>
        </ul>
    `;
        internshipEl.innerHTML = setHTML;
    }

    {
        let achievementsEl = document.querySelector('#achievement');
        // console.log(achievements["Summary"])
        var setHTML = `
    <ul>
    `
        for (let summary of achievements["Summary"]) {
            setHTML += `
        <li>${summary}</li>
        `
            // console.log(summary)
        }

        setHTML += `
    </ul>
    `;
        achievementsEl.innerHTML = setHTML;
    }


    {
        let aboutSideEl = document.querySelector('.aboutSide');
        // console.log(aboutSideEl);
        var setHTML = `
    <div class="aboutSideInfo">
        <h3>Personal Information</h3>
        <span>${basics.phone}</span><br />
        <span>${basics.email}</span><br />
        <span><a href='${basics.profiles.url}'>${basics.profiles.network}</a></span>
    </div>
    <div class="aboutSideInfo">
        <h3>Techinal Skills</h3>`;

        for (let skill of skills.keywords) {
            setHTML += `
            <span>${skill}</span><br />
        `;
        }
        setHTML += `</div>
    <div class="aboutSideInfo">
        <h3>Hobbies</h3>`;
        for (let hobby of interests.hobbies) {
            setHTML += `
            <span>${hobby}</span><br />
            `;
        }
        setHTML += `</div>`;

        aboutSideEl.innerHTML = setHTML;
    }
    hideButton()
}

function hideButton() {

    if (window.resumeList.length === 1) {
        document.getElementById('prevBtn').style.visibility = 'hidden';
        document.getElementById('nxtBtn').style.visibility = 'hidden';
    }
    if (window.current === 0) {
        document.getElementById('prevBtn').style.visibility = 'hidden';
    }
    else {
        document.getElementById('prevBtn').style.visibility = 'visible';
    }

    if (window.current === window.resumeList.length - 1) {
        document.getElementById('nxtBtn').style.visibility = 'hidden';
    } else {
        document.getElementById('nxtBtn').style.visibility = 'visible';
    }
}

function filterByJobTitle(e) {
    const title = e.target.value.toLowerCase()
    window.resumeList = window.resumeBackup;

    window.resumeList = window.resumeList.filter(function callBack(resume){
        const position = resume.basics.AppliedFor.toLowerCase()
        return position.includes(title)
    })

    if(!window.resumeList.length){
        document.querySelector('.upper').style.visibility = 'hidden';
        document.querySelector('.main').style.visibility = 'hidden';
        document.getElementById('nxtBtn').style.visibility = 'hidden';
        document.querySelector('.error').style.display = 'flex';
        return
    }

    document.querySelector('.upper').style.visibility = 'visible';
    document.querySelector('.main').style.visibility = 'visible';
    document.getElementById('nxtBtn').style.visibility = 'visible';
    document.querySelector('.error').style.display = 'none';
    window.current = 0;
    feedDataToTemplate();
      
}

onLoad();
window.history.forward();
function noBack() {
    window.history.forward();
}