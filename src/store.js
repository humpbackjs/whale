/* eslint-disable no-template-curly-in-string */
export default {
  components: [
    {
      name: 'c0',
      version: '0.1.0',
      silent: true,
      url: 'https://cdn/path/${version}/${version}.jscdn/path/${version}/${version}.jscdn/path/${version}/${version}.js',
      props: {
        switch: false,
        number: 5,
        text: '$090',
      },
    },
    {
      name: 'c1',
      version: '0.1.1',
      url: 'https://cdn/path/${version}/index.js',
      props: {
        switch: false,
      },
    },
    {
      name: 'c2',
      version: '0.1.2',
      silent: false,
      url: 'https://cdn/path/${version}/index.js',
      props: {
        text: '$090',
      },
    },
    {
      name: 'c3',
      version: '0.2.0',
      silent: true,
      url: 'https://cdn/path/${version}/index.js',
      props: {
        text: '$090',
      },
    },
    {
      name: 'c4',
      version: '0.3.0',
      silent: true,
      url: 'https://cdn/path/${version}/index.js',
      props: {
        number: 5,
      },
    },
    {
      name: 'c5',
      url: 'https://cdn/path/${version}/index.js',
      version: '0.0.0',
    },
  ],
}
