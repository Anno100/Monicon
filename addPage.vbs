Option Explicit
Dim obj : set obj = CreateObject("WScript.Shell") 'Shell Programme ausführen
Dim fso : set fso = CreateObject("Scripting.FileSystemObject") 'File System




while MsgBox("Want to create a new Page?",vbYesNo) = vbYes
    Dim name : name = inputbox("Name:")
    Dim exist : exist = fso.FolderExists(name)
    if exist = 0 then 
        fso.CreateFolder(name)
        
        Dim html : set html = fso.CreateTextFile(name&"\Page.html")
        Dim js : set js = fso.CreateTextFile(name&"\Main.js")
        
        html.Write"<!DOCTYPE html>"&vbCrLf&"<html lang='en'>"&vbCrLf&"<head>"&vbCrLf&"<meta charset='UTF-8'>"&vbCrLf&"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"&vbCrLf&"<title>Home</title>"&vbCrLf&"</head>"&vbCrLf&"<body>"&vbCrLf&"<script src='../lib/Boot.js'>"&vbCrLf&"</script>"&vbCrLf&"</body>"&vbCrLf&"</html>"
        js.Write"function Main(){"&vbCrLf&vbCrLf&"}"
        obj.run(name&"\Page.html")
    Else
        MsgBox("existiert schon")

    end if
Wend
