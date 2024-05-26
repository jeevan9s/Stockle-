from flask import Flask, jsonify, request, render_template
import pandas as pd  
import yfinance as yf

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('stocklewebsite.html')

@app.route('/stockleAboutUspage')
def stockleAboutUspage():
    return render_template('stockleAboutUspage.html')

@app.route('/api/get_stock_data', methods=['GET'])
def get_stock_data():
    stock_code = request.args.get('stockCode')
    

    try:
        stock = yf.Ticker(stock_code)
        stock_history = stock.history(period='1d', interval='1h')
        dates = stock_history.index.strftime('%Y-%m-%d %H:%M').tolist()
        prices = stock_history['Close'].tolist()

        stock_data = {
            'stockCode': stock_code,
            'dates': dates,
            'prices': prices,
        }

        return jsonify(stock_data)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
