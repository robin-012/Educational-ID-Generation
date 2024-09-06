document.getElementById('photo').addEventListener('change', function() {
    var fileName = this.files[0].name;
    document.getElementById('selectedFileName').innerText = fileName;
});

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var photo = document.getElementById('photo').files[0];
    var college = document.getElementById('college').value;
    var name = document.getElementById('name').value;
    var rollNo = document.getElementById('rollNo').value;
    var department = document.getElementById('department').value;
    var batch = document.getElementById('batch').value;
    
    if (!photo || !college || !name || !rollNo || !department || !batch) {
    alert('Please fill out all fields.');
    return;
    }
    
    var reader = new FileReader();
    reader.onloadend = function() {
    var img = new Image();
    img.onload = function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 2 * 96; // 2 inches at 96 dpi
    canvas.height = 2 * 96; // 2 inches at 96 dpi
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    document.getElementById('idPhoto').src = canvas.toDataURL();
    }
    img.src = reader.result;
    }
    reader.readAsDataURL(photo);
    document.getElementById('idCollege').innerText = college;
    document.getElementById('idName').innerText = name;
    document.getElementById('idRollNo').innerText = "Roll No: " + rollNo;
    document.getElementById('idDepartment').innerText = "Department: " + department;
    document.getElementById('idBatch').innerText = "Batch: " + batch;
    var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "College: " + college + ", Name: " + name + ", Roll No: " + rollNo + ", Department: " + department + ", Batch: " + batch,
    width: 128,
    height: 128
    });
    document.getElementById('studentForm').style.display = 'none';
    document.getElementById('idCard').style.display = 'block';
    document.getElementById('downloadButton').style.display = 'block';
    });

    function download() {
        html2canvas(document.getElementById('idCard')).then(function(canvas) {
        var link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'idCard.png';
        link.click();
        });
        }