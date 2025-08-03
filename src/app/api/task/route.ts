import { pgPool } from "@/lib/db";  

export async function GET() {
    try {
      const result = await pgPool.query("SELECT * FROM tasks ORDER BY id DESC");
  
      return new Response(JSON.stringify(result.rows), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("GET /api/task error:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
}


export async function POST(request: Request) {
    try {
        const { task_name, description, due_date } = await request.json();
        const result = await pgPool.query(
            `INSERT INTO tasks (name, description, due_date) VALUES ($1, $2, $3) RETURNING *`,
            [task_name, description, due_date]
        );
        return new Response(JSON.stringify(result.rows[0]), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error creating task" }), { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, task_name, description, due_date } = await request.json();
        const result = await pgPool.query(
            `UPDATE tasks SET name = $1, description = $2, due_date = $3 WHERE id = $4 RETURNING *`,
            [task_name, description, due_date, id]
        );
        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(result.rows[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error updating task" }), { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const result = await pgPool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);
        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: "Task deleted", task: result.rows[0] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error deleting task" }), { status: 500 });
    }
}
