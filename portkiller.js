const child_process = require('child_process')

function killByPid(pid) {
    child_process.exec(`kill -9 ${pid}`, (err, out, _err) => {
        if ( err || _err ) throw new Error(err ? err : _err ? _err : 'Unknown error')
        else console.log('Successfull killed with pid:', pid)
    })
}

function killByPort(target) {
    child_process.exec(`netstat -vanp tcp | grep ${target}`, (err, out, _err) => {
        if ( err || _err ) console.error(err ? 'Nothing apps that is using entered port' : _err ? _err : 'Unknown error')
        else out.split(' ').filter(v => v !== '').forEach((v, i, a) => i % 8 === 0 ? killByPid(v) : null)
    })
}


const argvs = process.argv.length > 2 ? process.argv[2].split('=') : null

if (argvs !== null && argvs.length > 0 && argvs[0] === '-p' ) {
    killByPort(parseInt(argvs[1])) 
} else {
    console.error('Cant found arguments. Please, try now with this: portkiller -p=PORT ')
}