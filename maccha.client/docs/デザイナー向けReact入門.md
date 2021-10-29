# デザイナー向けReact概要

このチュートリアルはGatsbyというフレームワークを利用して進めてゆきます。
GatsbyはReactというライブラリをベースとしたフレームワークです。

TypeScriptを組み合わせて採用することでより生産性と安全性を高めていますが、
このチュートリアルでは主に、HTMLやCSSのみに焦点を当てているので、TypeScriptについては考えなくても進めることはできます。

* TypeScript
  - 静的型付けによりJavaScriptをより安全に記述でき、生産性を向上させるためのプログラミング言語です。ソースはJavaScriptにコンパイルされ文法としてはJavaScript + 型アノテーションのようなイメージです。
* React 
  - ユーザインタフェース構築のためのJavaScriptライブラリである
* Gatsby
  - Reactを利用して静的なWebページを生成する静的サイトジェネレータです。

[React公式](https://ja.reactjs.org/)
[TypeScript公式](https://www.typescriptlang.org/)
[Gatsby公式](https://www.gatsbyjs.com/)

まずはこちらの概要にしたがってプロジェクトを作成しましょう

https://github.com/visualiz-inc/visualiz-react-starter

# HTMLからReactとTypeScript

通常のHTMLでサイトを作成する場合はjQueryなどのJavaScriptライブラリを利用することが多いかと思います。
jQueryではなくReactを利用するメリットを紹介します。

* Button、Tab、List、UIの種別を問わず、一度定義すればそれを繰り返し使える
  -> 同じものを何回も作らなくて良い
* HTMLやCSSだけでサイトを作るのはかなり大変
  ->「ログインしていたら」とか「商品を買い物かごに入れていたら」といった、任意の条件にあわせたインターフェースの変化は上手く表現できない
  HTMLだけだったら「登録されているユーザー情報を100人分表示する」場面では100回繰り返して書く必要がある
それ以外にも色々……
  Reactなら上記の「条件の違い」や「繰り返し」も表現できる2
  HTMLやCSSだけではできないことができるようになる
  -> 効率の良いコードを書けるようになる

HTMLのコーディングのみを担当する場合はJavaScriptやjQueryについて考えずとも進めることはできマスタ。
JavaScriptやjQueryといった知識がなくともReactのHTMLの部分だけの利用であればReactを利用することは十分可能です。

シンプルなコード例から紹介していきます。

```import```や```const```や```export```は見慣れないかもしれません。
しかし```return```以降は見覚えがあるでしょう。
ほぼHTMLなんです。
ReactのHTMLのことをJSX(TypeScript環境ではTSXと呼ぶこともある)といいます。

```src/StaticPages/Endpoints/index.ts```
```tsx
import React from "react";

export default () => {
    return (
        <div>
            <h1>Hello React !!!</h1>
            <p>This is React Application.</p>
        </fiv>
    );
}
```

詳しくは後述しますがファイルの上部にスタイルシートへのパス```import "../Styles/style.scss"```を追加するとスタイルを読み込めます。

```src/StaticPages/Styles/style.css```
```css
.title {
  font-size: 30px;
  color : #112233;
}
```

```src/StaticPages/Endpoints/index.ts```
```tsx
import React from "react";
import "./style.scss";

export default () => {
  return (
    <div>
      <h1 className="title">Hello React !!!</h1>
      <p>This is React Application.</p>
    </div>
  );
}
```

#### ```className```について

##### 基本的には普通のHTMLと同じだが、```class```の指定は```className```としなければならないので注意！

一部キーワードがHTMLとは違う名前になっているので注意が必要です。
Reactの世界ではclassやforのというキーワードはCSSではない役割で使われているためこうなっています。
既に使ってしまっているので似たような名前を使ってクラス名の指定を表現しているんですね。
若干違和感を覚えるかもしれませんが、これは暗記するしかありません。

| HTML  | React     |
| ----- | --------- |
| class | className |
| for   | htmlFor   |

class, forなど一部特殊なキーワード以外であればHTMLと同じように指定できる

```html
<h1 style="font-size:15px;"></h1>
```

### もう少し複雑な例

この段階で微妙にHTMLと違うのは以下の2点のみ。

```class```ではなく```className```と書かれている
```img```タグの```src```や、```p```タグの中で```{}```を使って書かれている箇所がある（```{logo}```と```{userName}```）

```tsx
import logo from "./logo.svg";
import "./App.css";

const firstName = "John";
const lastName = "Doe";
const fullName = `${firstName} ${lastName}`;

export default () => {
  return (
    <div className="App">
      <p>
        Hello, {fullName}
      </p>
    </div>
  );
}

export default App;
```

#### {}の使用について

HTMLを書いていて、{}が何かの役割を担うことはありません。
ReactのHTML(JSX)で{}が出てきたら「このカッコの中ではJavaScriptが動いているんだな」と捉えてください。

```tsx
const firstName = "John"
const lastName = "Doe"
const fullName = `${firstName} ${lastName}`
```

こちらを日本語で解釈するとこのような感じです。

```
Johnという文字列をfirstNameという定数にいれます
Doeという文字列をlastNameという定数にいれます
firstNameとlastNameを合体(フォーマット)させた文字列をfullNameという定数にいれます
```

そしてfullNameは実際にはこのように使われています。

```tsx
<p>
  Hello, {fullName}
</p>
```

コードではこう書かれていますが、実際の結果を見るとHello, John Doeと表示されています。

### コンテンツのロード

画像やオーディオ等のコンテンツの埋め込み方法も複数存在します。

1. コンテンツのURLを指定する方法
2. Reactのソースに埋め込む方法

#### コンテンツのURLを指定する方法

こちらは普通のHTMLと同じです。
このパッケージの設定では```static```ディレクトリ配下に置いたファイルを指定することができます。


```static/images/logo.png```を指定する場合。
```tsx
import React from "react";

export default () => {
  return (
    <div>
        <h1  className="title">Hello React !!!</h1>
        <img 
            src="https://localhost:8000/images/logo.jpg" 
            className="App-logo" 
            alt="logo" 
        />
    </div>
  );
```

#### Reactのソースに埋め込む方法

画像ファイルを```import```することで、JavaScript変数に文字列として読み込めます。

```src/StaticPages/Assets/Images/logo.png```を指定する場合
```tsx
import React from "react";
import logo from "../Assets/Images/logo.png";

// Base64エンコードされたコンテンツデータ
// コンソールの出力結果を確認してみましょう
console.log(logo);

export default () => {
    return (
        <div>
            <h1  className="title">Hello React !!!</h1>
            <img 
                src={logo}
                className="App-logo" 
                alt="logo" 
            />
        </div>
    );
};
```

### 詳しくは入門書やサイトで

[デザイナーでも分かる範囲のReact、その書き方と学び方](https://qiita.com/xrxoxcxox/items/91f84c6bc3e03deb5853)
[React公式](https://ja.reactjs.org/)
[TypeScript公式](https://www.typescriptlang.org/)

