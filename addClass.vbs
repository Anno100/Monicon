
Dim fa : set fa = CreateObject("Scripting.FileSystemObject")
Dim current
Dim name : name = InputBox("Class name:","Set Class name")
Dim ex_name : ex_name = InputBox("Interface name:","Enter Interface")
Dim inputFile,outputFile

if ex_name = "" then ex_name = "Object"

if name <> "" then 
    fa.CreateTextFile("lib/"&name&".js")
    fa.OpenTextFile("lib/"&name&".js",2).Write "let check_"&name&" = setInterval(() => {"&vbCrLf&"if ("&ex_name&") {"&vbCrLf&name&" = class "&name&" extends "&ex_name&" {"&vbCrLf&"//enter your code"&vbCrLf&"}"&vbCrLf&"load_"&name&" = true;"&vbCrLf&"clearInterval(check_"&name&");"&vbCrLf&"}"&vbCrLf&"else{"&vbCrLf&"console.log('wait');"&vbCrLf&"}"&vbCrLf&"},1);"
    FindAndReplace "lib/Boot.js","/*add_class*/","class "&name&" extends "&ex_name&"{};"&vbCrLf&"importJs('../lib/"&name&".js');"&vbCrLf&"load_"&name&" = false;"&vbCrLf&vbCrLf&"/*add_class*/"
    FindAndReplace "lib/Boot.js","/*load_class*/","&& load_"&name&"/*load_class*/"

end if




function FindAndReplace(strFilename, strFind, strReplace)
    Set inputFile = fa.OpenTextFile(strFilename, 1)
    strInputFile = inputFile.ReadAll
    inputFile.Close
    Set inputFile = Nothing
    Set outputFile = fa.OpenTextFile(strFilename,2,true)
    outputFile.Write Replace(strInputFile, strFind, strReplace)
    outputFile.Close
    Set outputFile = Nothing
end function 