import * as React from 'react';
import './index.css';
import { widget } from '../../charting_library';

// TODO: CAMBIAR
import customIndicator from './SimpleIndicator';


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		symbol: 'AAPL',
		interval: 'D',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	tvWidget = null;

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			interval: this.props.interval,
			container: this.ref.current,
			library_path: this.props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			custom_indicators_getter: customIndicator,
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				console.log("hola2")
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				// button.addEventListener('click', () => );
				// if

				button.innerHTML = 'Apply Custom Indicator';

				button.addEventListener('click', () => {
					// https://github.com/serdimoa/charting/blob/master/Chart-Methods.md#createstudyname-forceoverlay-lock-inputs-callback-overrides-options
					tvWidget.chart().createStudy('Caloco', false, false, [5, 10, 20], null, { 'Plot.color': '#FF0000' });
				});

				
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				ref={ this.ref }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
