import React, { useState, useCallback } from 'react';

// Books コンポーネントの items 配列プロパティの要素の型
export interface Book {
  id: number;
  title: string;
}

// Books コンポーネントのプロパティ
export interface BooksProps {
  items: Book[]
}

// Books コンポーネントの定義
export const Books: React.FC<BooksProps> = (props) => {

  //配列設定用ステート
  const [ statitle, setStatitle ] = useState(props.items);
  //ボタンの初期値
  const buttoninitial=Array.from(Array(statitle.length)).fill("ボタンの値に変更します→");
  //ボタン設定用ステート
  const [ butstr, setButstr ] = useState(buttoninitial);
  
  let newstatitle = statitle.slice(0,statitle.length);

  const handleStatitle = useCallback((index) => {
    if (butstr[index] != newstatitle[index].title) {
      setButstr(butstr.map((but_,butindex) => (butindex === index ? newstatitle[index].title : but_)));
    }
    newstatitle[index].title = butstr[index];
    setStatitle(newstatitle);
  }, [butstr]);

  // items プロパティの要素数が 0 であれば何も描画しない
  if (statitle.length == 0) return null;

  // items プロパティの値を使って、複数の li 要素を作る
  let listItems = statitle.map((statitle_,index: number) =>
    <li key={statitle_.id}><button onClick={() => handleStatitle(index)}>{butstr[index]}</button>{statitle_.title}</li>
  );

  // ul 要素の描画
  return <ul>{listItems}</ul>;
};

export default Books