# はじめに

静的サイトジェネレータであるGatsbyをベースにモダンなフロントエンドアプリおよびWebページを開発するためのな環境が構築済みのスターターセットです。
使用した主な技術スタックを以下に記します。

* Gatsby - Reactを利用して静的なWebページを生成する静的サイトジェネレータです。
* React - ユーザインタフェース構築のためのJavaScriptライブラリである。
* TypeScript - 静的型付けによりJavaScriptをより安全に記述でき、生産性を向上させるためのプログラミング言語。
* Material UI - GoogleのMaterialデザインにより実装されたUIコンポーネントやCSSスタイリングの仕組みを提供します。


# インストール方法

まずは[Gatsby公式](https://www.gatsbyjs.com/)の[インストールページ](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)からGatsby CLIをインストールしてください。

ほとんどの場合以下のコマンドでインストールできると思います

```
npm install -g gatsby-cli
```

プロジェクトを作成したいディレクトリで以下のコマンドを実行するとプロジェクトのテンプレートができます。

```
$ gatsby new [プロジェクト名] https://github.com/visualiz-inc/visualiz-react-starter.git
```

# プリインストールライブラリ

プリインストールされたライブラリです。
可能な限りこちらを利用しましょう。

| Package                   | Description                               |
| ------------------------- | ----------------------------------------- |
|                           |                                           |

# VSCode拡張

エディタにVSCodeを利用する場合は以下の拡張機能をインストールすることをおすすめします。

| Package                   | Description                               |
| ------------------------- | ----------------------------------------- |
| ESLint                    | リアルタイムでESLintによる構文チェック      |
| vscode-styled-components  | CSS in JS用のシンタックスハイライト         |
| Markdown Preview Enhanced | Markdownのリアルタイムプレビュー            |
| VS Code Counter           | ソースのステップ数などの統計を出力できる     |
| Graph QL                  | GraphQL言語サポート                        |

# プロジェクトディレクトリ構成

```
│  .babelrc jsファイルをビルドをするための設定を記述します
│  .gitignore git管理から除外するための設定を記述します
│  gatsby-config.js Gatsbyの設定を記述します
│  package.json プロジェクトの設定や依存関係を記述します
│  README.md 簡単な説明を記述します（このファイル）
│  tsconfig.json TypeScriptの設定をします
│
├─static 静的コンテンツ
|  |      このディレクトリの中身は静的コンテンツとして配信されます
|  |
|  | favicon.ico ファビコン
|  | routes.json Azure Static Web Appsのルーティング設定
|
| 
└─src
    ├─App クライアントサイドアプリケーション（SPA）
    │      index.tsx クライアントサイドアプリケーションのエントリーポイント
    │      theme.ts Material UI のテーマ設定を記述します
    |      i18n.ts 多言語化リソースファイル
    │
    ├─Libs
    │  │  Frame.tsx ポータル画面のテンプレート（ヘッダー、サイドバー、メイン）
    │  │  
    │  └─Components 共通パーツ
    │
    └─StaticPages 静的に生成するページ全般
       │
       ├─Endpoints ページ一覧 StaticPages/Endpoints/sample/index.tsにはhttp://www.hoge.com/sampleのようにアクセスできます
       │           ここにjsxやtsx入れておくと自動的に静的ページとして登録されます
       │           export defaultに指定したコンポーネントが自動的にエントリーポイントになります
       |
       ├─Styles   共通スタイル
       |
       └─Components Endpointsから参照される共通パーツ
```

# 開発環境の起動

プロジェクトの作成ができたら以下のコマンドでパッケージ等の依存関係を解決しましょう。

```
$ yarn install
```

次に以下のコマンドで、localhostに開発用サーバーを起動することができます。

```
yarn start
```

出力されたホストにブラウザでアクセスするとページが表示されます
デフォルトはlocalhost:8000になっています。

```
http://localhost:8000
```

# ページの作成と記述

以下のように```page```配下にファイルを追加することで、ページを追加することができます。

```
src/pages/name.tsx
```
この場合は```https://example.com/name```にアクセスすると対象のページが表示されます。

ディレクトリをネストさせることもできます。
```
pages/aaa/bbb/ccc.tsx (https://example.com/aaa/bbb/ccc)
```

ファイルをindex.tsxにするとディレクトリ名でのアクセスもできます。
```
pages/aaa/bbb/index.tsx (https://example.com/aaa/bbb)
```

index.ts
```tsx
import React from "react";
export default () => {
    return (
        <>
            <h1>Hello React !!!</h1>
        </>
    );
}
```

上記の```index.ts```を表示するには

```StaticPages/Endpoints/index.ts```に配置してブラウザで```http://localhost:8000```にアクセスすると"Hello React !!!"のテキストが表示されます。

# HTMLからReactとTypeScript

GatsbyはReactというライブラリをベースとしたフレームワークです。
このパッケージはさらにTypeScriptを組み合わせて採用することでより生産性と安全性を高めています。

* TypeScript
  - 静的型付けによりJavaScriptをより安全に記述でき、生産性を向上させるためのプログラミング言語です。ソースはJavaScriptにコンパイルされ文法としてはJavaScript + 型アノテーションのようなイメージです。
* React 
  - ユーザインタフェース構築のためのJavaScriptライブラリである

jQueryではなくReactを利用するメリットは

* ボタン・タブ・リスト……UIの種別を問わず、一度定義すればそれを繰り返し使える
  -> 同じものを何回も作らなくて良い
* HTMLやCSSだけでサイトを作るのはかなり大変
  ->「ログインしていたら」とか「商品を買い物かごに入れていたら」といった、任意の条件にあわせたインターフェースの変化は上手く表現できない
  HTMLだけだったら「登録されているユーザー情報を100人分表示する」場面では100回繰り返して書く必要がある
それ以外にも色々……
  Reactなら上記の「条件の違い」や「繰り返し」も表現できる2
  HTMLやCSSだけではできないことができるようになる
  -> 効率の良いコードを書けるようになる

[React公式](https://ja.reactjs.org/)
[TypeScript公式](https://www.typescriptlang.org/)
[Gatsby公式](https://www.gatsbyjs.com/)

### デザイナー向けクイックReact概要

[こちら](#quick-react)

# スタイリングガイド

Reactにおいてスタイリング方法は複数あります。
このパッケージでは3通りの方法が選択できます。

1. スタイルシートを使う
2. Reactのソース内に記述する
3. インラインスタイル

### スタイルシートを使う

読み込めるスタイルシートの種類は以下の通りです。

* CSS
* SCSS
* SASS

### CSSの場合

```src/StaticPages/Styles/style.css```
```css
.foo {
    font-size: 20px;
    color: #f00;
}
```

```src/StaticPages/Endpoints/index.ts```
```tsx
import "../Styles/style.css";

export default () => {
  return (
    <p className="foo">スタイリングの例</p>
  )
}
```

### Reactのソース内に記述する

CSS in JSとも呼ばれますが、Javascript内にスタイルを記述する方法です。

CSS in JSライブラリとして、Emotionを採用しました。
EmotionはReeact JavaScript(TypeScript)のコード内でスタイルを記述する仕組みを提供します。
これによりcssよりも複雑なことを可能にしたり、管理をシンプルにすることができますので、こちらも積極的に利用してください。


VScodeを利用している場合は以下の拡張をインストールすることでシンタックスハイライトが適用されます。

```vscode-styled-components```

詳しくは公式のスタイルドキュメントを参照。

[Emotion 公式](https://emotion.sh/docs/introduction/)

例

メディアクエリや疑似要素も中に記述できます

```src/StaticPages/Endpoints/index.ts```
```tsx
import React from "react";
import { css } from "@emotion/react";

const foo = css`
    padding: 28px;
    display: flex;
    flex-direction: column;
    &:after{
      background: red;
      width: 100%;
      height: 100%;
      content: '';
    }
    @media (min-width: 420px) {
      font-size: 140px;
    }
`;

export default () => {
  return (
    <div>
      <p css={foo}>Foo</p>
    </div>
  )
}
```

##### オブジェクト形式

JavaScriptオブジェクト形式で指定する場合CSSのプロパティ名がキャメルケースになる点を注意

```tsx
import React from "react";
import { css } from "@emotion/react";

const foo = css({
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    fontSize: "20px",
    "&:after": {
      width: "100%",
      height: "100%"
      content: "",
    },
    "@media (min-width: 420px)": {
      fontSize: "14px",
    }
});

export default () => {
  return (
    <div>
      <p css={foo}>Foo</p>
    </div>
  )
}
```

例
| css            | js            |
| -------------- | ------------- |
| font-size      | fontSize      |
| flex-direction | flexDirection |
| font-family    | fontFamily    |


### インラインスタイル

こちらも上記と同じくCSSのプロパティ名がキャメルケースになる点を注意

```tsx
import React from "react";

export default () => {
    return (
        <p style={{ 
            fontSize: "20px",
            color: "#f00",
            lineHeight: 2, 
        }}>
            スタイリングの例
        </p>
    );
};
```

# MUI - UIコンポーネントライブラリ

ページごとにスタイルシートを記述するよりも、よく利用するブロックに分けて共通パーツ（コンポーネント）化させたり、あらかじめそういった便利なパーツを含むライブラリを利用することで、一貫性のある美しいUIを実現できたり、生産性を高めることができます。

MUIは、Button、Grid layout、Inputなどのよく利用する機能を、Googleが公開している「マテリアルデザイン」というガイドラインに従ってデザインされたUIコンポーネントライブラリです。

Materia UIを利用することで、美しいUIを実現しつつ、より効率的にUIを構築でき、生産性を高めることができます。
テーマの機能により色に一貫性を持たせたり、ダークテーマ、ライトテーマ、その他独自のテーマを作成することもできます。
その他生産性を高める豊富な機能が多数存在するので、積極的に利用していきましょう。

詳しくは公式ページを参照してください。

[Materia UI　公式ドキュメント](https://mui.com/)

例
```tsx
import React from 'react';
import Button from '@mui/material';

const App = () => {
  return <Button variant="contained">Hello World</Button>;
}
```

# 多言語化対応

[react i18n](https://react.i18next.com/)を利用することで多言語化も簡単に実現することができます。
詳しくは公式を参照してください。


##### 言語リソースを定義
```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
          "text1": "Hello, World !"
        },
        ja: {
          "text1": "こんにちは、世界！"
        },
    },
    lng: "ja",
    fallbackLng: "ja",
    interpolation: { escapeValue: false },
});
```

##### 言語リソースを利用
```tsx
import React from "react";
import { useTranslation } from "react-i18next";

export const ReactComponent = () => {
    const {t} = useTranslation();
    return (
      <div>
          {t("text1")}
      </div>
    );
}

```

# SPAとしてクライアントサイドルーティングを行う

Gatsbyは静的サイトジェネレータですがクライアントサイドルーティングも併用することができます。
これによりサイトの一部をSPA（Single Page Application）化することができます。

以下の設定でサンプルを用意しています

* エントリーポイント```src/StaticPages/pages/app/index.ts```
* SPAプロジェクトルート```src/Apps```

### ページ```StaticPages/Endpoints/app/index.tsx```または```StaticPages/Endpoints/app.tsx```の設定例

##### gatsby-config.jsにパスを登録

```js
// クライアントサイドルーティングするパスを追加
const clientRoutes = ["/app/*"];
```

##### ルーティング登録

以下の場合は```https://[host]/app```と```https://[host]/app/counter```が登録されます。
登録されたコンポーネントは自動でバンドル分割され、必要に応じて遅延ロードされるため初回でも比較的高速に描画することができます。

```tsx
import React from "react";
import { RouterConfig } from "Libs/Routing/RouterConfig";

export const routes: RouterConfig = {
    // absolute path
    basepath: "/app",
    // default home page path
    homepath: "/app",
    routes: [
        {
            component: () => import("./Views/SpaHomePage"),
            icon: () => <></>,
            path: "/",
            title: ""
        },
        {
            component: () => import("./Views/CounterPage"),
            icon: () => <></>,
            path: "/counter",
            title: ""
        }
    ]
};
```

##### 表示

```Libs/Routing/RouterConfig```を利用すると表示することができます。

```tsx
import React, { useState } from "react";
import { useAppLocation, AppRouterProvider } from "Libs/Routing/RouterConfig";

export default () => {
    const location = useAppLocation();
    return (
      {/* Animation will be triggered when location.key changed. */}
      <Grow key={location.key} in={true}>
        {/* Routed contents */}
        <AppRouterProvider config={routes} />
      </Grow>
    );
};
```

### デプロイ先にAzure Static Web Appsを利用する場合

Azure Static Web Appsを利用する場合は```static/routes.json```に以下のように設定する必要があります。

```json
{
    "routes": [
        {
            "route": "/app/*",
            "serve": "/app/index.html",
            "statusCode": 200
        }
    ]
}
```
