import commonjs from 'rollup-plugin-commonjs'

export default {
    // 入口文件的配置
    input: './index.js',
    output: {
        // 打包后的文件
        file: './dist/index.bundle.js',
        // 打包的格式
        format: 'cjs',
    },
    plugins: [
        commonjs({
            include: [
                'node_modules/**'
            ],
            // namedExports: {
            //     'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
            //     'node_modules/react-dom/index.js': ['render'],
            // }
        }),
    ]
}