import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <div id="portal" />
          <div>
            <Main />
          </div>  
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;