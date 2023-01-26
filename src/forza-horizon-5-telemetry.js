const Buffer = require('node:buffer');
// For reference
// Pulled from https://github.com/bennett-sh/forza-horizon/blob/main/src/parse.ts
//const DATATYPES = {
//    IsRaceOn: 's32',
//    TimestampMS: 'u32',
//    EngineMaxRpm: 'f32',
//    EngineIdleRpm: 'f32',
//    CurrentEngineRpm: 'f32',
//}

// This is limited because we only care about the EngineMaxRpm and CurrentEngineRpm
function parseTelemetry(data){
  let rpm = {}
  data.splice(0, 8)
  let temp = []
  temp = data.splice(0, 4)
  rpm.max =  Buffer.from(temp).readFloatLE(0)
  data.splice(0, 4)
  temp = data.splice(0, 4)
  rpm.current =  Buffer.from(temp).readFloatLE(0)
  if(rpm.max > 0){
    rpm.percent =  rpm.current / rpm.max
  }else{
    rpm.percent = 0
  }
  return rpm
}

module.exports = { parseTelemetry };