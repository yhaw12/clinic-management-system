const tests = [
  { name: 'Pap Smear (Cytology)', price: 12000, category: 'CERVICAL CANCER' },
  { name: 'Human Papilloma Virus (HPV)', price: 12000, category: 'CLINICAL CANCER TESTS' },
  // add more tests...
];

function TestCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tests.map((test, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h3 className="text-green-500 text-lg font-bold">{test.category}</h3>
          <p className="mt-2 text-gray-700">{test.name}</p>
          <p className="mt-2 text-gray-700 font-bold">{test.price} ₦</p>
        </div>
      ))}
    </div>
  );
}

export default TestCards;
