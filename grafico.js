fetch("http://localhost:3000/grafico")
    .then(response => response.json())
    .then(datos => {

        const servicios = datos.map(item => item.servicio);
        const cantidades = datos.map(item => item.cantidad);

        const ctx = document.getElementById("graficoReservas");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: servicios,
                datasets: [{
                    label: "Cantidad de reservas",
                    data: cantidades,
                    backgroundColor: [
                        "#36A2EB",
                        "#FF6384",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF"
                    ],
                    borderColor: [
                        "#2E86C1",
                        "#C0392B",
                        "#D4AC0D",
                        "#117A65",
                        "#6C3483"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Servicios más solicitados"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    })
    .catch(error => {
        console.error("Error:", error);
    });