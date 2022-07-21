//Deepl API KEY
const API_KEY = 'ここに自身のDeepL APIの認証キーを入力';
const API_URL = 'https://api-free.deepl.com/v2/translate';
//pro版のURLは下を使うように上をコメントアウトする．（URL間違ってたら書き換えてください．(-_-)zzz)
//const API_URL = 'https://api.deepl.com/v2/translate'

/// <abstract>
/// '選択範囲を翻訳' が押されたとき選択範囲を取得する．
/// </abstract>
$('#copyTranslate').on('click', function(){
    chrome.tabs.query({active:true, currentWindow:true},function(m_tabs){
        chrome.tabs.sendMessage(m_tabs[0].id, {message: "範囲を取得します"}, function(m_item){
            //document.body.style.backgroundColor = "red";
            if(!m_item){
                alert('選択範囲は見つかりませんでした．( ・∇・) pdfの翻訳は直接テキストをコピペして\n[上記を翻訳]ボタンを押して下さい．');
                return;
            }
            $('#m_target').val(m_item);
            //console.log(m_item);
            output();
        });
    });
});

/// <abstract>
/// '上記を翻訳' が押されたときテキストボックス内の文を翻訳する．
/// </abstract>
$('#pasteTranslate').on('click', function(){
    if(!$('#m_target').val()){
        alert('テキストボックスが空です．d(￣ ￣)');
        return;
    }
    //console.log("翻訳する")
    $('#m_target').val($('#m_target').val().replace(/\r?\n/g, ' '));
    output();
});

/// <abstract>
/// '上クリア' が押されたときm_targetテキストボックス内の文をクリアする．
/// </abstract>
$('#clearAbove').on('click', function(){
    $('#m_target').val('');
});

/// <abstract>
/// '下クリア' が押されたときm_resultテキストボックス内の文をクリアする．
/// </abstract>
$('#clearBelow').on('click', function(){
    $('#m_result').val('');
});

/// <abstract>
/// translate（選択したテキスト）を翻訳して result（下のボックス）に結果を表示する．
/// <\abstract>
function output(){
    const m_entext = $('#m_target').val();

    let m_content = encodeURI('auth_key=' + API_KEY + '&text=' + m_entext + '&source_lang=EN&target_lang=JA');
    let m_url = API_URL + '?' + m_content;

    fetch(m_url)
        .then(function(m_response){
            if(m_response.ok) return m_response.json();
            else throw new Error("Could not reach the API: " + m_response.statusText + " :(");
        }).then(function(m_data){
            $('#m_result').val(m_data["translations"][0]["text"]);// = m_data["translations"][0]["text"];
        }).catch(function(m_error){
            $('#m_result').val(m_error.message);// = m_error.message;
        });
}