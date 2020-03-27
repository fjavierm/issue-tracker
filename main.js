document.getElementById('issueForm').addEventListener('submit', (e) => {
    const issue = {
        id: chance.guid(),
        description: document.getElementById('description').value,
        severity: document.getElementById('severity').value,
        assignedTo: document.getElementById('assignedTo').value,
        status: 'Open'
    };

    let issues;
    if (localStorage.getItem('issues') == null) {
        issues = [];
    } else {
        issues = JSON.parse(localStorage.getItem('issues'));
    }

    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueForm').reset();

    fetchIssues();

    e.preventDefault();
});

function changeStatus(id, action) {
    const issues = JSON.parse(localStorage.getItem('issues'));

    for (let i  = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            action(issues, i);

            break;
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function closeIssue(id) {
    changeStatus(id, (x, y) => x[y].status = 'Closed')
}

function deleteIssue(id) {
    changeStatus(id, (x, y) => x.splice(y, 1))
}

function issueTemplate(issue) {
    return `<div class="well">
                <h6>Issue ID: ${issue.id}</h6>
                <p><span class="badge badge-info">${issue.status}</span></p>
                <h3>${issue.description}</h3>
                <p><span class="fa fa-clock-o" style="padding-right: 5px"></span>${issue.severity}</p>
                <p><span class="fa fa-user" style="padding-right: 5px"></span>${issue.assignedTo}</p>
                <a href="#" onclick="closeIssue('${issue.id}')" class="btn btn-warning">Close</a>
                <a href="#" onclick="deleteIssue('${issue.id}')" class="btn btn-danger">Delete</a>
            </div>`;
}

function fetchIssues() {
    const issues = JSON.parse(localStorage.getItem('issues'));

    if (issues == null) {
        return;
    }

    const issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (const issue of issues) {
        issuesList.innerHTML += issueTemplate(issue);
    }
}