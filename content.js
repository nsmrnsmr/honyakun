/// <abstract>
/// 画面で選択されている文字列を返す
/// </abstract>
chrome.runtime.onMessage.addListener(function(m_reqest, m_sender, m_sendResponse){
    let m_selection;
    console.log(m_reqest.message);
    //document.body.style.backgroundColor = "blue";

    if(window.getSelection){
        m_selection = window.getSelection().toString();
        //console.log("選択できてる");
    }else{
        m_selection = '';
        //console.log("NOOOOOO!");
    }
    
    //console.log(m_selection);
    m_sendResponse(m_selection);
    return true;
});