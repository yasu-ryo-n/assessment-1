'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
 function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり除去
      element.removeChild(element.firstChild);
    }
  }
  
assessmentButton.onclick = function() {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //　名前が空白の時は処理を終了する
        return;
    }
    
    // TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたの今年の恋愛運') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたの今年の恋愛運は？';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
    '{userName}の今年の恋愛運は大吉です。今年は今までに経験したことがないほどのモテ期が訪れるでしょう。',
    '{userName}の今年の恋愛運は吉です。今年中に運命の相手と出会えるでしょう。',
    '{userName}の今年の恋愛運は中吉です。あなたが恋人を欲しているのならそれができる可能性は高いです。',
    '{userName}の今年の恋愛運は小吉です。高望みをしなければ願いは叶うでしょう。',
    '{userName}の今年の恋愛運は末吉です。良くも悪くもありません。結果はあなたの行動で変わります。',
    '{userName}の今年の恋愛運は凶です。今年はあまり恋愛運が良くありません。自分を磨く一年にしましょう。',
    '{userName}の今年の恋愛運は大凶です。あなたの行動次第でいくらでも挽回のチャンスはあります。あきらめずに頑張りましょう。',
];

const spesialAnswer = [
    '{userName}の今年の恋愛運は最悪です。残念!諦めろ!お前に未来はない!!!'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName　ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 谷端臥壱と入力すると特別なメッセージが出るようにした。
    if (userName === '谷端臥壱') {
        let result = spesialAnswer[0];

        result = result.replace(/\{userName\}/g, userName);
        return result;
    } else {
        //　全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
    }
    
}
