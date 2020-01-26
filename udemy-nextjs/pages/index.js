import React, { Component } from 'react';
import Link from 'next/link';

class Index extends Component {
    // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
    static /*async*/ getInitialProps(context) {
        // Only renders on navigation
        console.log(context);

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: 'Mighty App'});
            }, 1000);
        });

        return promise;
    }

    render () {
        return (
            <div>
                <p>Hello Next.js - {this.props.appName}</p>
                <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
            </div>
        )
    }
}

export default Index;