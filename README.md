# [Muscle-Cut-Out](https://muscle-cut-out.vercel.app/)

## 概要
自分の上裸の画像からお腹をピックアップして切り取るwebアプリケーション。
<br>

### 背景
ダイエット中や筋トレ中は自分のお腹付近を管理したいと思います。またSNSなどにも顔は載せずお腹のみを載せることが多いと思います。そこで鏡などに写った自分の写真からお腹に着目して、自動でその部分を切り取るアプリを作りました。今まで写真を撮り、そこからトリミングをしていた作業を簡略化できます。スマホから本アプリにアクセスすれば、アプリ上で写真を撮り、自動で切り取られ、そのままシェアボタンでsnsにアップすることも可能です。あらなんて手軽。
※ただし背中側の画像は使用できません。現段階ではお腹側のみ対応です。
<br>

### アプリの使用方法
まず[アプリのURL](https://muscle-cut-out.vercel.app/)にアクセスし、枠をクリックすることで写真を選択、または撮影します。
![アプリ画面1](https://github.com/haseaki-poip/muscle-CutOut/blob/readme-image/readme_images/app1.png)

写真を入力したら、右下のトリミングボタンを押し、自動切り取りが開始します。アプリ起動後初回は時間が少しかかります。
以下の写真には[フリー素材の画像](https://freephotomuscle.com/archives/photo/9185)を使用しています。
![アプリ画面2](https://github.com/haseaki-poip/muscle-CutOut/blob/readme-image/readme_images/app2.png)

切り取りが終了すると結果が表示されます。黄色のボタンで保存が可能です。スマホの場合は共有画面が開き、そこから画像の保存やSNSへの共有が選択できます。パソコンではローカルへの画像の保存が開始されます。
![アプリ画面3](https://github.com/haseaki-poip/muscle-CutOut/blob/readme-image/readme_images/app3.png)

### 特長
#### 1. TensorFlow.jsの使用
TensorFlow.jsを使用し、フロントエンドのみで姿勢予測のモデル生成および、人体の関節点位置の予測をさせています。

## 開発技術
### 活用した技術
#### フレームワーク・ライブラリ・モジュール
- Frontend: TypeScript, React, TensorFlow.js, Tailwind
- Backend:  not use
- Other:    Vercel
