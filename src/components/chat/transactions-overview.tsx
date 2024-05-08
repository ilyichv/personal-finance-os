"use client";

import { ResponsiveBar } from "@nivo/bar";

export function TransactionsOverview({
  props: { data },
}: {
  props: {
    data: { id: number | null; total: number; name: string | null }[];
  };
}) {
  return (
    <div className="aspect-[16/9]">
      <ResponsiveBar
        data={data.map((d) => ({
          ...d,
          id: d.id ?? -1,
          name: d.name ?? "Uncategorized",
        }))}
        tooltip={(input) => (
          <div className="rounded-md bg-white px-2 py-1 text-xs">
            <span className="font-semibold capitalize">{input.label}: </span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(input.value)}
          </div>
        )}
        tooltipLabel={(input) => `${input.id}`}
        indexBy="name"
        keys={["total"]}
        margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
        padding={0.3}
        colors={["#2563eb"]}
        enableGridX
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={null}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart transaction overview"
      />
    </div>
  );
}

export function TransactionOverviewSkeleton() {
  return "Loading...";
}
