class ProfileImage {
	constructor(name, options = {}) {
		this.name = name;
		this.textColor = options.textColor || "#002626"
		this.backgroundColor = this.getColorFromName();
		this.fontFamily = options.fontFamily || "Arial";
		this.fontSize = options.fontSize || 40;
		this.fontWeight = options.fontWeight || "normal";
	}
	png() { // returns png as base64 string
		if (!this.name) {
			return this.pngLoadingImage();
		}
		let canvas = document.createElement("canvas");
		let context = canvas.getContext("2d");
		canvas.width = 256;
		canvas.height = 256;
		context.fillStyle = this.backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.font = this.fontWeight + " 100px " + this.fontFamily;
		context.fillStyle = this.textColor;
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(this.getName(), canvas.width / 2, canvas.height / 2);
		return canvas.toDataURL("image/png");
	}
	pngLoadingImage() {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext('2d');
		ctx.strokeStyle = '#3498db';
		ctx.stroke();
		return canvas.toDataURL("image/png");
	}
	getColorFromName() {
		const hashMap = {
			"A": "#fdba74",
			"B": "#a3e635",
			"C": "#34d399",
			"Ç": "#22d3ee",
			"D": "#a78bfa",
			"E": "#818cf8",
			"F": "#f472b6",
			"G": "#f43f5e",
			"Ğ": "#34d399",
			"H": "#22d3ee",
			"İ": "#a78bfa",
			"I": "#818cf8",
			"J": "#f472b6",
			"K": "#f43f5e",
			"L": "#34d399",
			"M": "#22d3ee",
			"N": "#a78bfa",
			"O": "#818cf8",
			"Ö": "#f472b6",
			"P": "#f43f5e",
			"R": "#34d399",
			"S": "#22d3ee",
			"Ş": "#a78bfa",
			"T": "#818cf8",
			"U": "#f472b6",
			"Ü": "#f43f5e",
			"V": "#34d399",
			"Y": "#22d3ee",
			"Z": "#a78bfa",
		};
		const color = hashMap[this.getNameFirstLetter()] || "#a5f3fc";
		return color;
	}
	getNameFirstLetter() {
		return (this.name[0] || "").toUpperCase();
	}
	getSurnameFirstLetter() {
		const surname = this.name.split(" ")[1];
		if (!surname) {
			return "";
		}
		return (surname[0] || "").toUpperCase();
	}
	getName() {
		return this.getNameFirstLetter() + this.getSurnameFirstLetter();
	}
}

export const profileImageGenerator = (name: string) => {
	return new ProfileImage(name).png();
}