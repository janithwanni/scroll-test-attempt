export default function valueCounts(arr) {
	const result = arr.reduce(
		(acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
		{}
	);
	return result;
}
