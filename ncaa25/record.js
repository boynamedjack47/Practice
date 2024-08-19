document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Initial hardcoded team records
    const teamRecords = {
        "fsu-record": "10-1",
        "nebraska-record": "10-2",
        "georgia-record": "10-2",
        "psu-record": "10-2",
        "texas-record": "6-6",
        "msu-record": "7-6",
        "olemiss-record": "6-7",
        "tennessee-record": "5-7",
        "nc-record": "2-10",
        "osu-record": "3-9",
        "lsu-record": "4-8",
        "oregon-record": "1-11"
    };

    // Function to parse a record and return a sortable tuple [wins, losses]
    function parseRecord(record) {
        const [wins, losses] = record.split('-').map(Number);
        return [wins, losses];
    }

    // Function to sort and render the records
    function renderSortedRecords(records) {
        // Sort the teams by their records (best record first)
        const sortedTeams = Object.entries(records)
            .map(([id, record]) => [id, parseRecord(record)])
            .sort(([idA, [winsA, lossesA]], [idB, [winsB, lossesB]]) => {
                if (winsA !== winsB) return winsB - winsA; // Sort by wins descending
                return lossesA - lossesB; // If wins are the same, sort by losses ascending
            });

        // Populate each team's record in the respective span
        sortedTeams.forEach(([id, record]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = record.join('-');
            } else {
                console.error(`Element with ID ${id} not found`);
            }
        });
    }

    // Initial render
    renderSortedRecords(teamRecords);

    // Function to update records dynamically and re-render
    function updateRecords(newRecords) {
        // Update records with new values
        Object.assign(teamRecords, newRecords);
        // Re-render the sorted records
        renderSortedRecords(teamRecords);
    }

    // Example usage of updateRecords
    // updateRecords({ "lsu-record": "5-7", "osu-record": "4-8" });
});
