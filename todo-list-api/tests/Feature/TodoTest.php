<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Todo;

class TodoTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_fetch_all(): void
    {
        Todo::factory()->count(10)->create();

        $response = $this->getJson('/api/todos');

        $response->assertStatus(200)->assertJsonCount(10);
    }

    #[Test]
    public function it_can_create_a_task(): void
    {
        $taskData = [
            'content' => 'Do your homework',
            'status' => false,
        ];

        $response = $this->postJson('/api/todos', $taskData);

        $response->assertStatus(201)->assertJson([
            'content' => 'Do your homework',
            'status' => false,
        ]);

        $this->assertDatabaseHas('todos', $taskData);
    }

    #[Test]
    public function it_can_update_a_task_content(): void
    {
        $todo = Todo::factory()->create([
            'content' => 'Initial task',
            'status' => false,
        ]);

        $response = $this->putJson("/api/todos/{$todo->id}", [
            'content' => 'Updated task',
        ]);

        $response->assertStatus(200)->assertJson([
            'content' => 'Updated task',
        ]);

        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'content' => 'Updated task',
        ]);
    }

    #[Test]
    public function it_can_update_a_task_status(): void
    {
        $todo = Todo::factory()->active()->create();

        $response = $this->putJson("/api/todos/{$todo->id}", [
            'status' => true,
        ]);

        $response->assertStatus(200)->assertJson([
            'status' => true,
        ]);

        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'status' => true,
        ]);
    }

    #[Test]
    public function it_can_update_content_and_status(): void
    {
        $todo = Todo::factory()->create();

        $response = $this->putJson("/api/todos/{$todo->id}", [
            'content' => 'New task content',
            'status' => true,
        ]);

        $response->assertStatus(200)->assertJson([
            'content' => 'New task content',
            'status' => true,
        ]);
    }

    #[Test]
    public function it_can_delete_a_task(): void
    {
        $todo = Todo::factory()->create();
        $response = $this->deleteJson("/api/todos/{$todo->id}");
        $response->assertStatus(204);

        $this->assertDatabaseMissing('todos', [
            'id' => $todo->id,
        ]);
    }

    #[Test]
    public function it_validates_status_is_boolean_on_create()
    {
        $response = $this->postJson('/api/todos', [
            'content' => 'Test todo task',
            'status' => 'not-a-boolean',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors(['status']);
    }
}
