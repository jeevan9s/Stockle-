
function handleKeyPress(event) {
  if (event.keyCode === 13) {

    event.preventDefault();

    getVisualizeStockData();
  }
}


function refreshPage() {
  window.location.reload();
}
function getVisualizeStockData() {
  const stockCode = document.getElementById("stockCode").value;
      fetch(`http://127.0.0.1:5000/api/get_stock_data?stockCode=${stockCode}`)
      .then((response) => response.json())
      .then((stockData) => {
        const ctx = document.getElementById("stock-chart");
  
        new Chart(ctx, {
          type: "line",
          data: {
            labels: stockData.dates,
            datasets: [{
              label: `${stockData.stockCode} Stock Prices Within Today`,
              size: 22,
              data: stockData.prices,
              borderColor: 'rgb(142, 175, 142)',
              borderWidth: 4.5,
              fill: false,
             
            }],
          },
          options: {
            plugins: {
              legend: {
                  labels: {
                    color:'rgb(240,248,255)',
                      font: {
                          size: 30,
                          family: 'Tajawal', 
                          weight: 'bold' 
                      }
                  }
              }
          },
            scales: {
              x: {
                title:{
                  display: true,
                  text: 'Time (Within Today)',
                  color: 'rgb(240,248,255)',
                  font: {
                    family: 'Tajawal',
                    size: 25,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                
                
              },
              ticks: {
                color: 'rgb(163, 169, 173',
                font: {
                  family: 'Tajawal',
                  size: 20,



                }

              }
            },
              y: {
                title:{
                  display: true,
                  text: 'Prices',
                  color: 'rgb(240,248,255)',
                  font: {
                    family: 'Tajawal',
                    size: 25,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
              
                
              },
              ticks: {
                callback: function (value, index, ticks) {
                  return '$' + value;
                },
                color: 'white',
                font: {
                  family: 'Tajawal',
                  size: 22,

                }
              }
              }
            
          }
        }
        });
      })
    .catch((error) => console.error("Error fetching stock data:", error));

  document.getElementById('stockCode').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      getVisualizeStockData();
    }

  })
};
