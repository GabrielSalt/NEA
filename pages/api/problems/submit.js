import {PythonShell} from 'python-shell';
const fs = require('fs');

export default async function handler(req, res) {
  const data = req.body
  PythonShell.runString(`
from ast import literal_eval
import time
import multiprocessing.pool
import functools
import os

absolute_path = os.path.abspath(__file__)

def timeout(max_timeout):
    """Timeout decorator, parameter in seconds."""
    def timeout_decorator(item):
        """Wrap the original function."""
        @functools.wraps(item)
        def func_wrapper(*args, **kwargs):
            try:
              """Closure for function."""
              pool = multiprocessing.pool.ThreadPool(processes=1)
              async_result = pool.apply_async(item, args, kwargs)
              # raises a TimeoutError if execution exceeds max_timeout
            except Exception:
              pool.close()
            return async_result.get(max_timeout)
        return func_wrapper
    return timeout_decorator

results = []
inputslist = []
outputs = []
testcases = ${data.problem.testcases}
for i in range(len(testcases)):
  inputslist.append(testcases[i][0])
  outputs.append(testcases[i][1])

start = time.time_ns()

@timeout(5.0)
${data.code}

for i in range(len(testcases)):
  results.append(${data.problem.name}(*inputslist[i]))

end = time.time_ns()
time_n = (end - start)

testResults = []
for i in range(len(results)):
  if results[i] == outputs[i]:
    testResults.append(True)
  else:
    testResults.append(False)

if time_n > 1000000000:
  timeMessage = f'{round(time_n/1000000000, 2)} seconds'
elif time_n > 1000000:
  timeMessage = f'{int(time_n/1000000)} milliseconds'
else:
  timeMessage = f'{int(time_n/1000)} microseconds'

results_array = []
results_array.append(testResults)
results_array.append(timeMessage)
results_array.append(absolute_path)
print(results_array)
`, 
  null, function (err, results, message) {
    if (err){
      if (err.toString().split('\n').length > 1){
        res.status(200).json({ success: false , results: [false,false,false], time: 0, message: err.message.split('\n')[err.message.split('\n').length-2] })
      }
      else {
        res.status(200).json({ success: false , results: [false,false,false], time: 0, message : err.message })
      }
    }
    else {
      try{
        results = results[results.length-1].replace(/\[|\]/g,'').split(',')
        try {
          fs.unlinkSync(results[4].slice(2,-1))
        } catch(err) {
          console.error(err)
        }
        const time = results[3].slice(2,-1)
        results = [results[0],results[1],results[2]]
        res.status(200).json({ success: true, results , time, message: ''})
      }
      catch{
        const time = results[3].slice(2,-1)
        res.status(200).json({ success: true, results , time,  message: ''})
      }
    }
  });
}