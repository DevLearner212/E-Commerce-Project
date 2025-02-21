import React from 'react';

const PriceSection = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Don’t Miss Out: Join Our Subscription Club!</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                        Stay Ahead of the Trend! Subscribe now and receive the latest product launches, curated collections, and style tips directly in your inbox.
                    </p>
                    <div className="flex mx-auto border-2 border-orange-500 rounded overflow-hidden mt-6">
                        <button className="py-1 px-4 bg-orange-500 text-white focus:outline-none">Annually</button>

                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {[
                        {
                            title: 'START',
                            price: 'Free',
                            features: [
                                'Buy ',
                                'Review',
                                'Rating'
                            ],
                            buttonLabel: 'Button',
                            buttonBg: 'bg-gray-400',
                            popular: false,
                        },
                        {
                            title: 'PRO',
                            price: '$38',
                            features: [
                                'Buy ',
                                'review',
                                'Feedback',
                                'Feedback Share',
                                'Voice AI',


                            ],
                            buttonLabel: 'Buy',
                            buttonBg: 'bg-indigo-500',
                            popular: true,
                        },
                        {
                            title: 'BUSINESS',
                            price: '$89',
                            features: [
                                'Pro / Basic features',
                                'Feedback Share',
                                'Voice AI',
                                'Admin Panel',
                                'DashBoard',
                            ],
                            buttonLabel: 'buy',
                            buttonBg: 'bg-gray-400',
                            popular: false,
                        },
                        {
                            title: 'SPECIAL',
                            price: '$712',
                            features: [
                                'Pro / Basic features',
                                'Feedback Share',
                                'Voice AI',
                                'Admin Panel',
                                'DashBoard',
                                'Team Meeting',
                                'custome customer care',
                            ],
                            buttonLabel: 'buy',
                            buttonBg: 'bg-gray-400',
                            popular: false,
                        },
                    ].map((plan, index) => (
                        <div className="p-4 xl:w-1/4 md:w-1/2 w-full" key={index}>
                            <div className={`h-full p-6 rounded-lg border-2 ${plan.popular ? 'border-indigo-500' : 'border-gray-300'} flex flex-col relative overflow-hidden`}>
                                {plan.popular && (
                                    <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                                )}
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{plan.title}</h2>
                                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                    <span>{plan.price}</span>
                                    <span className="text-lg ml-1 font-normal text-gray-500">/Year</span>
                                </h1>
                                {plan.features.map((feature, idx) => (
                                    <p className="flex items-center text-gray-600 mb-2" key={idx}>
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        {feature}
                                    </p>
                                ))}
                                <button className={`flex items-center mt-auto text-white ${plan.buttonBg} border-0 py-2 px-4 w-full focus:outline-none hover:bg-opacity-75 rounded`}>
                                    {plan.buttonLabel}
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PriceSection;
