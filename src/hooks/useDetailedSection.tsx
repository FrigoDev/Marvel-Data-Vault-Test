import { useEffect, useState } from "react";

export default function useDetailedSection<
  PrimaryType,
  SecondaryTypeA,
  SecondaryTypeB
>(
  getPrimaryData: () => Promise<PrimaryType>,
  getDataA: () => Promise<SecondaryTypeA[] | undefined>,
  getDataB: () => Promise<SecondaryTypeB[] | undefined>
) {
  const [data, setData] = useState<
    [
      PrimaryType | undefined,
      SecondaryTypeA[] | undefined,
      SecondaryTypeB[] | undefined
    ]
  >([undefined, undefined, undefined]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const GetAllData = async () => {
    try {
      const primaryData = await getPrimaryData();
      const [dataA, dataB] = await Promise.all([getDataA(), getDataB()]);
      setData([primaryData, dataA, dataB]);
      setLoading(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllData();
  }, []);

  return { data, loading, error };
}
