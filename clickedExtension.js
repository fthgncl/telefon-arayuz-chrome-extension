
delete_cookie("sayfayuklendi")
function delete_cookie(kayityeri){
        document.cookie = kayityeri+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}