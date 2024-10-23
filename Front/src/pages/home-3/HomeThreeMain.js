import React from 'react';
import About from './AboutSection';
import HomeBanner from './BannerSection';
import ScrollToTop from '../../components/ScrollTop';

const HomeThreeMain =() => {
		return (
			<>
				<div className="react-wrapper">
            		<div className="react-wrapper-inner">
						{/* BannerSection-start */}
						<HomeBanner />
						{/* BannerSection-start */}

						{/* About-area-start */}
						<About />
						{/* About-area-end */}

						{/* scrolltop-start */}
						<ScrollToTop />
						{/* scrolltop-end */}
					</div>
				</div>

			</>
		);
	}

export default HomeThreeMain;