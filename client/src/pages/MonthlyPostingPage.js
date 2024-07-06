import React, { useState, useEffect, useRef } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css'; 
import 'react-toastify/dist/ReactToastify.css';

function MonthlyPostingPage() {
    const [chartStatus, setChartStatus] = useState('loading');
    const chartRef = useRef(null);

    useEffect(() => {
        const loadFlourishScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://public.flourish.studio/resources/embed.js';
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const initializeChart = () => {
            if (typeof window.Flourish === 'undefined') {
                throw new Error('Flourish is not defined');
            }
            return new Promise((resolve, reject) => {
                try {
                    window.Flourish.embed(
                        { src: 'visualisation/12104488', container: chartRef.current },
                        (embed) => resolve(embed)
                    );
                } catch (error) {
                    reject(error);
                }
            });
        };

        const embedFallbackIframe = () => {
            const iframe = document.createElement('iframe');
            iframe.src = 'https://flo.uri.sh/visualisation/12104488/embed';
            iframe.width = '100%';
            iframe.height = '400';
            iframe.style.border = 'none';
            chartRef.current.innerHTML = '';
            chartRef.current.appendChild(iframe);
        };

        const setupChart = async () => {
            try {
                await loadFlourishScript();
                console.log('Flourish script loaded successfully');
                await initializeChart();
                console.log('Flourish chart initialized successfully');
                setChartStatus('loaded');
            } catch (error) {
                console.error('Error in chart setup:', error);
                embedFallbackIframe();
                setChartStatus('fallback');
            }
        };

        setupChart();

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <div className="m-4 d-flex justify-content-between align-items-center">
                <h3>월간 포스팅</h3>
            </div>
            <div style={{ height: 'calc(100vh - 64px)' }}>
                <div 
                    ref={chartRef}
                    className="col-9"
                    style={{ width: '100%', height: '100%' }}
                />
                {chartStatus === 'loading' && <p>차트를 불러오는 중입니다...</p>}
                {chartStatus === 'fallback' && <p>차트 로딩에 문제가 발생하여 대체 버전을 표시합니다.</p>}
            </div>
        </div>
    );
}

export default MonthlyPostingPage;


