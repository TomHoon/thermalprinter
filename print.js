const { SerialPort } = require('serialport');
const iconv = require('iconv-lite');

const port = new SerialPort({
  path: 'COM3',  // Change this to match your printer's port
  baudRate: 9600 // Adjust if needed
});

// ESC/POS Command to Initialize Printer
const initPrinter = Buffer.from([0x1B, 0x40]); // ESC @

// Convert Korean text to CP949
const koreanText = "안녕하세요 ThermalPrinter 테스트 중입니다...\n\n";
const encodedText = iconv.encode(koreanText, 'cp949'); 

port.write(initPrinter, (err) => {
  if (err) console.error('Error:', err.message);
  else console.log('Printer initialized');
});

// Send Korean text
port.write(encodedText, (err) => {
  if (err) console.error('Error:', err.message);
  else console.log('Korean text sent to printer');
});
