import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY as string;

if (!GROQ_API_KEY) {
	throw new Error('❌ JWT_SECRET is not defined in environment variables');
}

const client = new Groq({
	apiKey: GROQ_API_KEY,
});

export const generateAgentResponse = async (diagnosis: any) => {
	const prompt = `
    Anda adalah **Predictive Maintenance AI Copilot**.

    Gunakan data ML berikut untuk memberikan analisis profesional, alasan teknis, dan rekomendasi tindakan:

    DATA DIAGNOSIS ML:
    ${JSON.stringify(diagnosis, null, 2)}

    ---

    ### Instruksi Output (HARUS IKUTI):
    ## 1. Ringkasan Kondisi Mesin
    - Buat ringkasan singkat berdasarkan anomaly, risiko, dan failure_cause.

    ## 2. Alasan Teknis (Why)
    Jelaskan **kenapa** kondisi ini terjadi berdasarkan:
    - suhu
    - rpm
    - torque
    - tool wear
    - failure mode

    ## 3. Tingkat Risiko (0–100)
    Klasifikasi:
    - Low (<5%)
    - Medium (5–20%)
    - High (>20%)

    ## 4. Potensi Penyebab
    List penyebab yang paling mungkin.

    ## 5. Rekomendasi Aksi (Actionable)
    Berikan langkah teknis yang bisa dilakukan teknisi.

    ## 6. Prioritas
    - Immediate
    - Scheduled
    - Monitoring

    ## 7. Executive Summary
    Paragraf singkat untuk manajemen.
    `;

	const response = await client.chat.completions.create({
		model: 'llama-3.3-70b-versatile',
		messages: [
			{ role: 'system', content: 'Anda adalah AI Maintenance Engineer berpengalaman 20 tahun.' },
			{ role: 'user', content: prompt },
		],
		temperature: 0.2,
	});

	return response.choices[0].message.content;
};
