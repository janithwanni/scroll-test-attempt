import cross from "$data/cross.csv";
import time from "$data/time.csv";

export async function load() {
	let crossData = cross.map((x) => ({
		...x,
		class: x.class == "9" ? "A" : "B"
	}));
	let data = { cross: crossData, time: time };
	return { data };
}
