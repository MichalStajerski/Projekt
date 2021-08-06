function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    console.log('eventTargetID',event.target.id)
    event.target.append(document.getElementById(data));
  }