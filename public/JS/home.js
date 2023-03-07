const hiddenBlocks = document.querySelectorAll('.onclick-display');
const newTask = document.getElementById("newtask");
const closeBtnDiv = document.getElementById('close-btn');
const closeBtn = document.getElementById('closebtn');
const newTaskDiv = document.getElementById('new-task-div');
const addBtnDiv = document.getElementById('add-task');
const checkBox = document.getElementsByClassName('checkboxDefaiult');

newTask.onclick = () => {
    for (var i = 0; i < hiddenBlocks.length; i++) {
        hiddenBlocks[i].style.display = 'block';
    }
    closeBtnDiv.style.display = 'block';
    newTaskDiv.style.display = 'none';
    addBtnDiv.style.display = 'block';
    document.getElementById('buttonspane').scrollIntoView();
}
closeBtn.onclick = () => {
    for (var i = 0; i < hiddenBlocks.length; i++) {
        hiddenBlocks[i].style.display = 'none';
    }
    closeBtnDiv.style.display = 'none';
    newTaskDiv.style.display = 'block';
    addBtnDiv.style.display = 'none';
}


