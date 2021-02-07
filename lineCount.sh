echo "
Ignoring 'node_modules', 'package-lock.json' 
"
cloc --fullpath --not-match-d="(node_modules|ckeditor5)" --not-match-f="(package\-lock\.json)" .
read -n 1 -s -r -p "
Press any key to continue...
"
