export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS pre-flight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    const url = new URL(request.url);
    const method = request.method;

    try {
      // Ensure the R2 bucket binding exists
      if (!env.cold_chain_bucket) {
        throw new Error("R2 bucket binding is not available");
      }

      switch (method) {
        case "GET": {
          // Fetch the JSON file from the R2 bucket (chain.json)
          const object = await env.cold_chain_bucket.get("chain.json");
          if (!object) {
            return new Response(
              JSON.stringify({ error: "Data not found" }),
              { status: 404, headers: corsHeaders }
            );
          }
          const coldChainData = await object.text();
          return new Response(coldChainData, {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        case "POST": {
          const newData = await request.json();

          // Retrieve current data from R2 bucket (chain.json)
          const object = await env.cold_chain_bucket.get("chain.json");
          let coldChainData = [];
          if (object) {
            coldChainData = JSON.parse(await object.text());
          }

          // Add new data to the array
          coldChainData.push(newData);

          // Save the updated data back to R2 bucket (chain.json)
          await env.cold_chain_bucket.put("chain.json", JSON.stringify(coldChainData));

          return new Response(
            JSON.stringify({ message: "Resource added", newData }),
            { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        case "PUT": {
          const updateData = await request.json();
          const { code } = updateData;

          // Retrieve current data from R2 bucket (chain.json)
          const object = await env.cold_chain_bucket.get("chain.json");
          let coldChainData = [];
          if (object) {
            coldChainData = JSON.parse(await object.text());
          }

          // Find and update the data by code
          const index = coldChainData.findIndex(item => item.code === code);
          if (index === -1) {
            return new Response(
              JSON.stringify({ error: "Item not found" }),
              { status: 404, headers: corsHeaders }
            );
          }

          coldChainData[index] = { ...coldChainData[index], ...updateData };

          // Save the updated data back to R2 bucket (chain.json)
          await env.cold_chain_bucket.put("chain.json", JSON.stringify(coldChainData));

          return new Response(
            JSON.stringify({ message: "Resource updated", updatedData: coldChainData[index] }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        case "PATCH": {
          const patchData = await request.json();
          const { code } = patchData;

          // Retrieve current data from R2 bucket (chain.json)
          const object = await env.cold_chain_bucket.get("chain.json");
          let coldChainData = [];
          if (object) {
            coldChainData = JSON.parse(await object.text());
          }

          // Find and update the data by code
          const index = coldChainData.findIndex(item => item.code === code);
          if (index === -1) {
            return new Response(
              JSON.stringify({ error: "Item not found" }),
              { status: 404, headers: corsHeaders }
            );
          }

          coldChainData[index] = { ...coldChainData[index], ...patchData };

          // Save the updated data back to R2 bucket (chain.json)
          await env.cold_chain_bucket.put("chain.json", JSON.stringify(coldChainData));

          return new Response(
            JSON.stringify({ message: "Resource patched", patchedData: coldChainData[index] }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        case "DELETE": {
          const { code } = await request.json();

          // Retrieve current data from R2 bucket (chain.json)
          const object = await env.cold_chain_bucket.get("chain.json");
          let coldChainData = [];
          if (object) {
            coldChainData = JSON.parse(await object.text());
          }

          // Find and delete the data by code
          const index = coldChainData.findIndex(item => item.code === code);
          if (index === -1) {
            return new Response(
              JSON.stringify({ error: "Item not found" }),
              { status: 404, headers: corsHeaders }
            );
          }

          coldChainData.splice(index, 1); // Remove the item

          // Save the updated data back to R2 bucket (chain.json)
          await env.cold_chain_bucket.put("chain.json", JSON.stringify(coldChainData));

          return new Response(
            JSON.stringify({ message: "Resource deleted" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        default: {
          return new Response("Method Not Allowed", {
            status: 405,
            headers: corsHeaders,
          });
        }
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
  },
};
